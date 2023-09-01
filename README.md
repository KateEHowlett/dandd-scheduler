# dandd-scheduler
The ultimate goal of this project is to create a site where a user can add themselves to a player database, set a default availability, and then update an individual date's availiability for that player. There is a three week availability that is autofilled by the sbumit form that would rollover at midnight. Players would log in to be able to edit their availability, the site owner (Dungeon Master) would be able to set individual dates to have the status of 'Session'. Eventually it would be able to show the DM best possible dates at a glance - highlighting the row perhaps.

As of 01/09/2023 I am making this repo from version 1.0 in CodePen: https://codepen.io/Salixa/pen/WNLxQJO?editors=1011.

This version has much of the essential functionality: players can add themselves, set a default availability, update individual days. The current problem with the code as-is is that when a player updates their availability on a particular day the class that ought to be applied is given to the first player's date - colouring the box the appropriate colour, but does not get applied to the correct box.

I will probably continue to make some edits in the codepen but I wanted to make a repo so that as and when anyone wanted to put in in VSCode (I know Kieran already has!) then they can make a branch here and maybe we can make something cool :)

N.B. 01/09/2023 The current code is copy-pasta'd from CodePen.io so does not include the appropriate inclusions of each file.
