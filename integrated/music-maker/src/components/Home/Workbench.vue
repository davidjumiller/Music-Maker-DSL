<template>
    <div class="row row-cols-2 gx-0 px-5">
        <div class="col gx-0 px-2 pt-1 bg-darker top-round align-right">
            <button id="run-btn" class="btn text-light" title="run DSL" @click="runDSL()">
                <i class="bi bi-file-earmark-play"></i>
            </button>
        </div>
        <div class="col gx-0 px-2 pt-1 top-round align-right history-header">
            <div id="history-btn" class="btn text-grey">
                <b>
                    <i class="bi bi-arrow-counterclockwise"></i>
                    History
                </b>
                
            </div>
        </div>
    </div>
    <div id="content" class="row row-cols-2 gx-0 px-5">
        <div id="editor-container" class="col gx-0 px-3 pt-2 text-white btm-round">
            <textarea type="text" id="code-editor-form" class="form-control" title="editor" v-model="dslStr"></textarea>
        </div>
        <div id="output-container" class="col gx-0 px-3 pt-1 br-shadow btm-round">
            <div class="row gx-0">
                <div class="container container-card">
                    <!-- This is just a sample card. The entire section needs to be added dynamically
                    with JS when we get output from the backend; -->
                    <div v-for="recording in recordings" class="card">
                        <div class="card-body text-dark">
                            <div class="row gx-0">
                                <div class="col-12 gx-0 px-2">
                                    <b>{{ recording.name }}</b>
                                </div>
                            </div>
                            <div class="row gx-0">
                                <audio controls v-bind:src="recording.link">
                                    <p>Your browser does not support the<code>audio</code> element.</p>
                                </audio>
                            </div>
                            <div class="row gx-0 text-grey">
                                <small>{{ recording.time }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import dsl from '../../../parser/interpreter.js';
    import soundEngine from '../../../sound-engine/engine.js';
    import * as CodeMirror from 'codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/dracula.css';

    export default {

        name: 'Workbench',

        data: () => ({
            dslStr: "",
            recordings: [],
            editor: null
        }),

        methods: {

            async runDSL (e) {
                try {
                    const parsedDSL = dsl.interpret(this.dslStr);
                    if (parsedDSL) {
                        let recording = await soundEngine.build(parsedDSL);
                        this.recordings = [recording].concat(this.recordings);
                    } else {
                        alert("Something went wrong while attempting to run your DSL.\nPlease check the console for possible solutions.");
                    }
                } catch (error) {
                    alert(error);
                }
                
                
            }
        }, 
        mounted() {

            this.editor = CodeMirror.fromTextArea(document.getElementById('code-editor-form'), {
                lineNumbers: true,
                theme: 'dracula'
            });

            let scope = this;
            this.editor.on('change', function(cm) {
                scope.dslStr = cm.getValue();
            });
        }

    }

</script>

<style>
    .cm-s-dracula.CodeMirror, .cm-s-dracula .CodeMirror-gutters {
        background-color: #1F2330 !important;
        border: none;
        color: #00A6DA !important;
        height: 95%;
        resize: none;
        width: thin;
    }
</style>
