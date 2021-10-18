<template>

    <div id="header" class="row gx-0 header-row px-5">

            <div class="col-3">
                <img id="logo" src="@/assets/music-maker-logo.png" alt="Music Maker Logo"/>
            </div>

            <div class="col-6 title-text">
                <img id="text-logo" src="@/assets/music-maker-txt.png" alt="Music Maker title text"/>
            </div>
            <div class="col-3 align-right header-btn-group">
                <button id="docs-btn" type="button" class="btn button-custom text-inherit" @click="modal.show()">Quick Reference</button>
                <button id="docs-btn" type="button" class="btn button-custom text-inherit" @click="goToGitHub()">Learn More</button>
            </div>
            <div class="modal fade" ref="docsModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-grey font-regular" id="dosModalTitle">A Guide To Writing DSL for Music Maker</h5>
                            <button type="button" class="btn-close" @click="modal.hide()" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body text-dark font-regular">
                            <p>
                                The Music Maker is a Domain-Specific Language (DSL) that allows programmers to quickly create basic
                                musical tune with the following grammar rules:
                            </p>
                            <pre>
                                <code>
<!--                             -->program         : sound+ combination+ play
<!--                             -->sound           : 'Sound ' soundname 'as ' SUBTYPE pattern repeat? usesound 'EndSound'
<!--                             -->soundname       : TEXT
<!--                             -->pattern         : 'Pattern:' TEXT
<!--                             -->repeat          : 'Repeat:' NUM
<!--                             -->usesound        : 'UseSound:' USESOUNDS '"'
<!--                             -->combination     : 'Components:' TEXT track+ 'EndCombination'
<!--                             -->track           : 'Track' offset? volume? components* 'EndTrack'
<!--                             -->offset          : 'Offset:' NUM
<!--                             -->volume          : 'Volume:' NUM
<!--                             -->components      : 'Components:' '[' component [','component]* ']'
<!--                             -->component       : NUM? '*' COMPONENT_NAME
<!--                             -->play            : 'Play' TEXT

<!--                             -->TEXT            : ~[[\]\r\n ]+
<!--                             -->SUBTYPE         : 'Preset' | 'Clip';
<!--                             -->NUM             : [0-9]+
<!--                             -->USESOUNDS       : ~[[\]'"]+
<!--                             -->COMPONENT_NAME  : ~[[\]\r\n,* ]+
                                </code>
                            </pre>
                            <p>
                                In addition to the grammar rules above, a few logical rules are in place in order for the DSL to
                                run properly:
                            </p>
                            <ul>
                                <li>
                                    The <code>pattern</code> must be a string consisting of any combination of only characters
                                    "x" and "-" and no other characters, where an "x" means to play a note, where as "-" means
                                    rest (don't play a note)
                                </li>
                                <li>TEXT in each <code>component</code> must match a <code>soundname</code> created by you</li>
                                <li>
                                    If a <code>sound</code> has <code>SUBTYPE</code> "Clip", <code>USESOUNDS</code> must be
                                    a single line of text, with each note following the pattern of {note}{octave} with a space
                                    between each note(e.g. "C2 G9")
                                </li>
                                <li>
                                     If a <code>sound</code> has <code>SUBTYPE</code> "Preset", then the <code>USESOUNDS</code>
                                     must match exactly with any one of the following sound names provided: "Kick", "Base",
                                     "Snare", "OpenHats", or "ClosedHats"
                                </li>
                                <li>
                                    The indentation level on each line does not affect the success/failure of running the DSL.
                                </li>
                            </ul>
                            <p>
                                Below is example of a working DSL for Music Maker is:
                            </p>
                            <pre>
                                <code>
<!--                             -->Sound Kick1 as Preset
<!--                             -->    Pattern: x-xx-x
<!--                             -->    Repeat: 10
<!--                             -->    UseSound: "Kick"
<!--                             -->EndSound

<!--                             -->Sound Melody1 as Clip
<!--                             -->    Pattern: x
<!--                             -->    Repeat: 5
<!--                             -->    UseSound: "C1 D2 F7"
<!--                             -->    EndSound

<!--                             -->Combination Draft1
<!--                             -->    Track
<!--                             -->        Volume: 10
<!--                             -->        Components: [5*Kick1, 5*Melody1]
<!--                             -->    EndTrack
<!--                             -->    Track
<!--                             -->        Offset: 10
<!--                             -->        Volume: 5
<!--                             -->        Components: [15*Kick1, 6*Melody1]
<!--                             -->    EndTrack
<!--                             -->EndCombination
<!--                             -->Play Draft1
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import { Modal } from 'bootstrap';
export default {
    name: 'Header',
    data: () => ({
        modal: null
    }),
    methods: {
        goToGitHub: () => {
            window.location = "https://github.students.cs.ubc.ca/cpsc410-2021w-t1/Project1Group24/blob/master/README.md";
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.docsModal)
    }
}

</script>
