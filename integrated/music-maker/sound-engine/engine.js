/*
    Sound engine entrypoint
*/

import soundBuilder from "./sound.js";
import combinationPlayer from "./combination.js";
import toWav from 'audiobuffer-to-wav';
const engine = {};

let recorder;

engine.build = (specs) => {

    return new Promise(async(resolve, reject) => {
        
        let sounds;
        let audioData;
        let combinations = [];
        let play;

        try {
            // Validate
    
            for (let [spec, idx] of specs.entries()) {

                let firstKey = Object.keys(spec)[0];
                if (firstKey === 'error') {
                    reject({error: `Sound/Combination Block ${idx}: ${spec.error}`});
                }
            }

            // Process Sounds

            sounds = specs.filter((block) => {
                return block.type === 'Sound';
            });

            audioData = new Map();
            for (let sound of sounds) {
                console.log(sound);
                try {
                    let data = await soundBuilder.render(sound);
                    audioData.set(sound.name, data);
                } catch (error) {
                    reject(error);
                    return;
                }
                
            }

            // Process Combination

            combinations = specs.filter((block) => {
                return block.type === 'Combination';
            });

            // Process Play

            play = specs.filter((block) => {
                return (Object.keys(block)[0] == 'play');
            });

            if (play.length > 1) {
                reject("Only one play block is allowed");
                return;
            }

        } catch (error) {
            reject(`There were errors while trying to parse the DSL. \n
            Please open the console in the browser developer tools (F12),
            to see errors logged by antlr`);
            return;
        }

        let toPlay = null;
        let combinationNames = [];
        
        for (let combination of combinations) {

            if (combinationNames.indexOf(combination.name) != -1) {

                reject(`Not allowed: Multiple play blocks named ${combination.name}`);
                return;

            } else if (combination.name == play[0].play) {
                toPlay = combination;
            }

            combinationNames.push(combination.name);
        }

        if (toPlay == null) {

            reject(`No combination block named ${play[0].play}`);
            return;
        }

        try {

            const context = new AudioContext();
            const stereoMix = context.createMediaStreamDestination();
            recorder = new MediaRecorder(stereoMix.stream, { audioBitsPerSecond : 128000 });
            recorder.start();

            await combinationPlayer.render(toPlay, audioData, context, stereoMix);

            let recordingLink = await getRecording();
            let recording = {
                name: toPlay.name,
                link: recordingLink,
                time: new Date()
            }

            resolve(recording);

        } catch (error) {
            reject(error);
        }

    });

}

const getRecording = () => {
    return new Promise((resolve, reject) => {
        recorder.addEventListener('dataavailable', async(e) => {
        
            let arrayBuffer = await e.data.arrayBuffer();
            let recording_context = new AudioContext();
            let decodedAudio = await recording_context.decodeAudioData(arrayBuffer);

            let wav = toWav(decodedAudio);
            const blob = new window.Blob([ new DataView(wav) ], {
                type: 'audio/wav'
            });
            let res = window.URL.createObjectURL(blob);
            recorder = null;
    
            resolve(res);
        });
    
        recorder.stop();
    })
    
}

export default engine;