Use this file to commit information clearly documenting your milestones'
content. If you want to store more information/details besides what's required
for the milestones that's fine too. Make sure that your TA has had a chance to
sign off on your milestones each week (before the deadline); typically you
should discuss your material with them before finalizing it here.

# Milestone 1

## The Idea
Music Maker - Ability to generate a basic musical tune based on a specification.

<ul>
  
  <li>String together different sounds</li>
  <li>Tracks that can loop, and layer on top of each other</li>
  <li>Would need some sort of soundbyte upload system? Gui?</li>
  <li>Alternatively, we can have the ability to create sounds with the DSL, ex: change pitch, tone, speed, volume. Which then come together to make some kind of music or sound effect.</li>
  
</ul>

## Things to do

<ul>
  
  <li>Deliberate and design a structure for the DSL</li>
  <li>Research and finalize technical implementation details for interpreting the DSL (use of frameworks, method of input for the DSL, etc.)</li>
  <li>Division of responsibilities</li>
  <li>Identify potential users to document user stories</li>
  
</ul>

## Key TA Thoughts

<ul>

  <li>Having a GUI is good, but do not focus on that.</li>
  <li>It’s better to elaborate on the loop feature, essentially, we want your language able to help users do something creative. So loop should not just be simply duplicating sound tracks.</li>
  <li>Being able to create sounds also sounds good, and seems more doable than importing soundbyte (not familiar with music, is that some music format or just a word you guys come up with?)  Defining sounds is a more interesting feature on your DSL, so I personally prefer the ability to create sounds.</li>

</ul>

# Milestone 2

## Roadmap

<ul>
  <li>Demo Server + CI/CD Setup (By Sunday Sep. 26th)</li>
  <li>Grammar finalized & Documentation for user (By the end of Monday Sep. 27th)</li>
  <li>1-2 User Feedback (language prototype) (by the end of Thursday Sep. 30th)</li>
  <li>Core functionality without link to DSL finished (by Tuesday Oct. 5th)</li>
  <li>Web Page with editor and documentation (by Thursday Oct. 7th)</li>
  <li>Parsing (by Tuesday Oct. 12th)</li>
  <li>User Testing (final product) (by Thursday Oct. 14th)</li>
  <li>3min Video (final product) (by Sunday Oct. 17th)</li>
</ul>

## Responsibilities

<ul>
  <li>EVERYONE:</li>
    <ul>
      <li>Meet up in person every monday (2pm-5pm), online thursday (7:30pm)</li>
      <li>Grammar/syntax design</li>
      <li>Parser, Backend Programming</li>
    </ul>
  <li>DAVID: User feedback/testing, Milestone writeup/submission</li>
  <li>DHRUV: Web Page, Demo Server + CI/CD Setup</li>
  <li>HOWARD: Video production, documentation, User Testing</li>
  <li>MICHELLE: Web, user feedback/testing</li>

</ul>

## Draft Syntax

~~~
“Sound” TEXT “as” TYPE:
  “Pattern:” PATTERN_RULE
  “Use Sound:” SOUND_RULE
  “Volume:” VOLUME_RULE
“Finish sound”
~~~

<p>TYPE: “Preset” | “Clip”</p>

<p>TEXT: ^[a-zA-Z]*$</p>

<p>PATTERN_RULE: “repeat pattern” PATTERN_DEF NUM “times”</p>

<p>PATTERN_DEF: [x_R\-]+</p>

<p>NUM: [0-9]+</p>

<p>SOUND_RULE: -TODO- </p>

<p>VOLUME_RULE: ^[1-9]?[0-9]{1}$|^100$</p>

<br>

### Example Code:

~~~
Sound Kick1 as Preset:
	RepeatPattern “x-xx-x” 10 Times
	UseSound: “Kick”
  Volume: 10
Finish Sound

Sound Melody1 as Clip:
	RepeatPattern: 'x' 16 Times,
  UseSound “CM Dm FM”
  Volume: 15
Finish Sound


Combination ‘Draft1’:
	Track
		MaxLength: 50
		Volume: 10
		Components: [5*Kick1, 5*Melody1]
  	EndTrack
  	Track
	  	MaxLength: 35
	  	Offset: 10
	  	Volume: 5
		Components: [15*Kick1, 6*Melody1]
  	EndTrack
EndCombination

Play Draft1
~~~

## Summary of Current Progress

<ul>
  <li>Outlined the goal of our DSL and who our users would be</li>
  <li>Assigned responsibilities, and set an in person meeting time and location for working on code</li>
  <li>Decided on language to write in, frameworks to use, form of final product</li>
  <li>Near final draft of the syntax of our language</li>
</ul>

# Milestone 3

## Code Example Used For First User Testing

~~~
Sound Kick1 as Preset:
	RepeatPattern “x-xx-x” 10 Times
	UseSound: “Kick”
	Volume: 10
Finish Sound

Sound Melody1 as Clip:
	RepeatPattern: 'x' 16 Times
	UseSound “CM Dm FM”
	Volume: 15
Finish Sound


Combination ‘Draft1’:
	Track
		MaxLength: 50
		Volume: 10
		Components: [5*Kick1, 5*Melody1]
	EndTrack
	Track
		MaxLength: 35
		Offset: 10
		Volume: 5
		Components: [15*Kick1, 6*Melody1]
	EndTrack

Play Draft1
~~~

<p><strong>Changes:</strong> Only slight clarifications on syntax made</p>

## First Round of User Testing

<p><strong>User 1:</strong> Using this language, create a single chord that consists of the D Major (DM) and E Minor (Em) keys, and repeats three times. Play the sound at the end.</p>

<ul>
  <li>User was confused about multiple ways of repeating a pattern, asking if they should repeat within the “Sound” or within the “Track”</li>
  <li>Assumed that the units used were in seconds, and that a MaxLength of 20 meant the track was 20 seconds long with the sounds stretched to fit that.</li>
  <li>When told MaxLength field was the number of repetitions, was still unclear. Again does this include the repeats within the “Sound” as well as in “Track”?</li>
  <li>Within Components, unsure if 2 sounds would play consecutively or together.</li>
  <li>Tried to play sound directly ex: “Play sound1” instead of putting into a combination, unsure if we wanted to allow this.</li>
</ul>

<p><strong>User 2:</strong></p>
<ul>
  <li>The language looked good and was easy to use. The user found the syntax to be easier than using Scribbletune with JS.</li>
  <li>The user suggested to not include the tab/indentation as a required part of the syntax, as it was easier to not keep track of the level of indentation when writing trying to write sample DSL.</li>
  <li>Some terminology was not intuitive for users who have never used Scribbletune or not familiar with music-making apps, so it would be helpful if the documentation of the final product contains some explanation to what those terms mean (e.g. preset, clip, what does the x & - mean in pattern)</li>
</ul>

# Milestone 4

## Status of Implementation

<p>As of Monday, October 4.</p>

### Complete
<ul>
<li>Set up programming environment</li>
<li>Set up hosting/deployment</li>
<li>Complete Lexer</li>
<li>Complete Parser</li>
</ul>

### In Progress
<ul>Front end UI</ul>

### Incomplete
<ul>
<li>Complete AST</li>
<li>Complete Static Checks</li>
<li>Complete Evaluation Stage</li>
<li>Error checking/messages</li>
</ul>

## User Study Plans

<ol>
<li>Get User that’s not the same user in UserStudy #1</li>
<li>Have a Minimal Viable Product (MVP) for our users</li>
<li>Have a documentation page including the example code ready for the user</li>
<li>Ask them to try read the documentation page</li>
<ol>
<li>If user confused, explain, then note the confusion</li>
<li>If not, we should ask if here’s any ambiguity in the documentation for our DSL</li>
</ol>
<li>Ask them to produce a specified short sequence of music with our DSL
</li>
<ol>
<li>Note every time they got confused when implementing the task
</li>
<li>If they got stuck somewhere, help them, but write down where they were stuck
</li>
<li>What errors did they encounter
</li>
</ol>
<li>Ask them to create whatever they like with the language
</li>
<ol>
<li>If a user has suggestions, document their suggestions.</li>
<li> if no suggestions, we ask them what can be improved</li>
</ol>
<li>Reflect on the informations collected, use them to improve our DSL
</li>
</ol>

## Roadmap for the Upcoming Days

<ul>
<li>Complete AST + Static Checks (by Friday, October 8)</li>
<li>Complete Front-end UI (by Monday, October 11)
<li>Complete Evaluate stage (by Wednesday, October 13)</li>
<li>User Study (by Friday, October 13)</li>
<li></li>
</ul>

<p>As seen on our jira project</p>
<a href="https://ibb.co/QkyCHx2"><img src="https://i.ibb.co/7QsRp0w/Screenshot-1.jpg" alt="Screenshot-1" border="0"></a>

# Milestone 5

## Status of Implementation

### Complete
<ul>
<li>Set up programming environment</li>
<li>Set up hosting/deployment</li>
<li>Complete Lexer</li>
<li>Complete Parser</li>
<li>Complete AST</li>
</ul>

### In Progress
<ul>
<li>Front end UI</li>
<li>Complete Static Checks</li>
<li>Complete Evaluation Stage</li>
<li>Error checking/messages</li>
</ul>

## Status of Final User Study

<p>Planned out and ready to go, waiting on implementation to be finished</p>

## Planned Timeline

<ul>
<li>Finish Implementation (by Friday Night)</li>
<li>Bug Fixes and Tweaks (Saturday)</li>
<li>Perform User Study + Film Video Presentation (Sunday)</li>
<li>Submit for Deadline (Monday morning 9am)</li>
</ul>

## Current DSL Example

~~~
Sound Kick1 as Preset
	Pattern: x-xx-x
  	Repeat: 10
	UseSound: "Kick"
	Volume: 10
EndSound

Sound Melody1 as Clip
	Pattern: x
  	Repeat: 5
	UseSound: “C1 D2 F5”
	Volume: 15
EndSound


Combination Draft1
	Track
		Volume: 10
		Components: [5*Kick1, 5*Melody1]
	EndTrack
	Track
		Offset: 10
		Volume: 5
		Components: [15*Kick1, 6*Melody1]
	EndTrack
EndCombination

Play Draft1
~~~

..
