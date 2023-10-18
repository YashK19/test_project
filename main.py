class PlanetDetection:
    def __init__(self):
            pass

    def detect_planet(self) -> str:
        """Method to detect a planet.

        Returns:
        str: The detected planet name.
        """
        # Code to detect which planet is placed on the sensor
        return ""

class AudioVisual:
    def __init__(self):
        pass

    def display_success(self, planet: str):
        """Method to display a success message.

        Args:
        planet (str): The planet name in the success message.
        """
        # Code to display success message on LED and play correct sound
        I2C_LCD1602.show_string("Correct!", 0, 0)

    def display_failure(self, planet: str):
        """Method to display a failure message.

        Args:
        planet (str): The planet name in the failure message.
        """
        # Code to display failure message on LED
        I2C_LCD1602.show_string("Incorrect..." , 0, 0)
        I2C_LCD1602.show_string("Try again." , 0, 1)

    def display_lesson_complete(self, message: str):
        """Method to display a lesson complete message.

        Args:
        message (str): The message to be displayed.
        """
        I2C_LCD1602.show_string("Lesson complete!" , 0, 1)

    def play_success_sound(self):
        """Method to play success sound."""
        # Code to play the specified sound
        music.tone_playable(Note.HighC, music.beat(BeatFraction.WHOLE))

    def play_fail_sound(self):
        """Method to play fail sound."""
        # Code to play the specified sound
        pass

    def play_rotation_sound(self):
        """Method to play rotation sound."""
        # Star Wars
        music.play(music.tone_playable(392, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(587, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(523, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(494, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(440, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(784, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(587, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(523, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(494, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(440, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(784, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(587, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(523, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(494, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(523, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(440, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
        # Code to play the specified sound
        pass

    def stop_rotation_sound(self):
        """Method to stop rotation sound."""
        # Code to stop the specified sound
        pass

    def play_lesson_complete_sound(self, txt, aChar):
        """Method to play lesson complete sound."""
        # Code to play the specified sound
        pass

    def myrfind(self, txt: str, aChar: str):
        for i in range(len(txt) - 1, -1, -1):
            if txt[i]  == aChar:
                return i
        return -1
    
    def display_question(self, question: str):
        """Method to display the question.

        Args:
        question (str): The question to be displayed.
        """
        pd = PlanetDetection()
        oldlastindex = 0
        lastindex = 0
        lastcompare = 0
        i = 0
        # display = True
        done = False 
        line = ""
        lines = []
        # # # serial.write_line(str(len(question)-1))
        while (lastindex < len(question)-1):
            lastcompare = 16 + lastindex
            # # serial.write_line(str(lastcompare))
            if (len(question) - 1 < lastcompare):
                lastcompare = len(question)-1
                done = True
                # serial.write_line("Done is true.")
            if (question[lastcompare] != " "):
                # x = 1
                # self.myrfind("a", "b")
                lastindex = self.myrfind(question[oldlastindex:lastcompare], " ") + oldlastindex
                # serial.write_line(str(lastindex))
            else:
                lastindex = lastcompare
            
            if (lastcompare >= len(question)-1):
                lastindex = len(question)
            line = question[oldlastindex:lastindex]
            oldlastindex = lastindex
            i += 1
            # serial.write_line(line)
            lines.append(line)
            if (done):
                break

        j = 0
        while(pd.detect_planet() != ""):
            if (j > 1 and j % 2 == 0):
                basic.pause(3000)
                I2C_LCD1602.clear()
            row = j % 2
            I2C_LCD1602.show_string(lines[j], 0, row)
            j += 1
            if (j >= len(lines)):
                basic.pause(3000)
                I2C_LCD1602.clear()
                j = 0
    
## ALL MAIN CODE HERE ##
I2C_LCD1602.lcd_init(39)
av = AudioVisual() 
question = "What planet is closest to the sun my guy huh answer me bruh come on why don't you be cool and stuff????"
av.display_question(question)