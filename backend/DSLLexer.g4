lexer grammar DSLLexer;

SOUND_START : 'Sound' WS+ -> mode(TEXT_MODE);
PRESET: 'as Preset';
CLIP: 'as Clip';
SOUND_END: 'EndSound';

COMBINATION_START : 'Combination' WS+ -> mode(TEXT_MODE);

TRACK_START: 'Track';
TRACK_END: 'EndTrack';

PLAY: 'Play' WS+ -> mode(TEXT_MODE);

//Options
PATTERN_START: 'Pattern:' WS* -> mode(TEXT_MODE);
REPEAT_START: 'Repeat:' WS*;
USESOUND_START: 'UseSound:' WS* '"' -> mode(USESOUNDS_MODE);
VOLUME_START: 'Volume:' WS*;
OFFSET_START: 'Offset:' WS*;
MAXLENGTH_START: 'MaxLength:' WS*;
COMPONENTS_START: 'Components:' WS* '[' WS* -> mode(COMPONENT_MODE);

WS : [\r\n\t ] -> channel(HIDDEN);
NUM : [0-9]+;

mode TEXT_MODE;
TEXT : ~[[\]\r\n ]+ -> mode(DEFAULT_MODE);

// Mode for tokenizing the special case Components field
mode COMPONENT_MODE;
COMPONENT_REPEAT: [0-9]+;
MULTIPLY: '*'-> channel(HIDDEN);
COMPONENT_NAME: ~[[\]\r\n,* ]+;
COMPONENTS_END: ']' -> mode(DEFAULT_MODE);
COMMA: ',' WS* -> channel(HIDDEN);

// Mode for tokenizing the special case UseSounds field
mode USESOUNDS_MODE;
USESOUNDS: ~[[\]\r\n"' ]+;
USESOUNDS_END: '"' -> mode(DEFAULT_MODE);