# The Music Maker Project (MMP) - Project1Group24

## Introduction
The Music Maker Project (MMP) is a Domain-Specific Language (DSL) that allows you to quickly create basic sound effects and export them as WAV files.

## Objective
The objective of this DSL is to enable software developers that have negligible/very basic knowledge of music to create basic sound effects for use in small-scale software projects (such as a simple quiz game).

## Technical Context
MMP is implemented using a modular, event-based approach and relies on the JavaScript's native <a href="https://www.w3.org/TR/webaudio/">Web Audio API standard</a> for producing and recording sounds. This is an immensively powerful, ever-evolving standard and provides plently of opportunity for future extensibility/devlopment of this project.

## The Basics

### Structure

The DSL consists of 3 major blocks:

* Sound
* Combination
* Play

### Sound

The sound block describes individual audio tracks to be used for creating your sound effect.

There are 2 types of sound blocks:

* Preset
* Clip

#### Preset

Preset sound blocks represent the use of an exisiting sound effect.

```
Sound Kick1 as Preset
    Pattern: x-xx-x
    Repeat: 1
    UseSound: "Kick"
EndSound
```

You specify which sound effect you want to use in the `UseSound` attribute. Currently, you can choose from Kick, Bass, OpenHats, ClosedHats & Snare.

#### Clip

Clip sound blocks represent the use of a sequence of musical notes.

```
Sound MyMelody as Clip
    Pattern: x
    Repeat: 2
    UseSound: "C1 D2 F7"
EndSound
```

You specify the sequence of notes (with octaves) in the `UseSound` attribute as shown in the example sound block, named 'MyMelody', above.

In both types of sound blocks, you must also specify `Pattern` & `Repeat`.

`Pattern` is denoted by a series of 'x' and '-'.
x means that the sound specified in `UseSound` should be played and '-' represents a pause of (approximately) 0.5 seconds.

`Repeat` denotes how many times you wish to repeat the pattern.

### Combination

This block specifies how you would like to sequence the sounds you defined earlier.

```
Combination Draft1
    Track
        Volume: 75
        Components: [5*Kick1, 1*MyMelody]
    EndTrack
    Track
        Offset: 100
        Volume: 25
        Components: [2*MyMelody]
    EndTrack
EndCombination
```

The two main parts of a Combination are the `Track` and `Components`.

As is illustrated by the way the DSL is strucuted, all Tracks in a combination are played in parallel.

In a Track, you specify:

* Volume - loudness of the track.
* Offset - start time delay in milliseconds

and 

* Components

`Components` represents the sounds that a track should play.
The sounds specified in the `components` section are played in sequence (one after the other) for each track.

### Play

To help you ideate/draft your sound effect, you are allowed to create multiple combination blocks in your code. 
However, only one of them will played/rendered upon executuion.

The `Play` block is used to specify which combination block you would like to be played in the current execution.

```
Play Draft1
```

### Full Example

```
Sound Kick1 as Preset
    Pattern: x-xx-x
    Repeat: 1
    UseSound: "Kick"
EndSound

Sound Melody1 as Clip
    Pattern: x
    Repeat: 2
    UseSound: "C1 D2 F7"
    EndSound

Combination Draft1
    Track
        Volume: 75
        Components: [5*Kick1, 1*Melody1]
    EndTrack
    Track
        Offset: 100
        Volume: 25
        Components: [2*Melody1]
    EndTrack
EndCombination
Play Draft1
```

## Documenation

```
program         : sound+ combination+ play
sound           : 'Sound ' soundname 'as ' SUBTYPE pattern repeat usesound 'EndSound'
soundname       : TEXT
pattern         : 'Pattern:' TEXT
repeat          : 'Repeat:' NUM
usesound        : 'UseSound:' USESOUNDS '"'
combination     : 'Components:' TEXT track+ 'EndCombination'
track           : 'Track' offset? volume? components* 'EndTrack'
offset          : 'Offset:' NUM
volume          : 'Volume:' NUM
components      : 'Components:' '[' component [','component]* ']'
component       : NUM? '*' COMPONENT_NAME
play            : 'Play' TEXT

TEXT            : ~[[\]\r\n ]+
SUBTYPE         : 'Preset' | 'Clip';
NUM             : [0-9]+
USESOUNDS       : ~[[\]'"]+
COMPONENT_NAME  : ~[[\]\r\n,* ]+
```

In addition to the grammar rules above, a few logical rules are in place in order for the DSL to
run properly:
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
