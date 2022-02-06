# WebGazerType
WebGazer-based gaze keyboard

The WebGazer library needs an http server to run, so you can run `python -m http.server --bind 127.0.0.1` in the same directory of sequential_input.html. It might work without one, so you could try running sequential_input.html first.

How to use:
1. Wait for the camera to load in the upper-left. Tracking dots should appear at key points on your face.
2. Calibrate by moving the mouse cursor anywhere on the screen, looking at, and clicking to add a datapoint. It might help to click a handful of times in the same spot before moving to another spot.
3. Move the cursor with your eyes to select a set of characters, then look at the desired character! A box will be 'selected' when the translucent box inside it fills up all of the way.

Tips:
1. Try adding calibration points for all regions of the screen! For example, make sure to hit all sides, all corners, and somewhere in the middle. We've found success with at least 8-10 different datapoints.
2. It helps to take your mask off (if it is safe to do so!), place your laptop on a table, and sit with your head in a relatively stable position.
3. Note the special characters in the bottom right selection - you can even use backspace and space!