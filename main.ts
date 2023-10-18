class PlanetDetection {
    constructor() {
        
    }
    
    public detect_planet(): string {
        /** Method to detect a planet.

        Returns:
        str: The detected planet name.
        
 */
        //  Code to detect which planet is placed on the sensor
        return ""
    }
    
}
class AudioVisual {
    constructor() {
        
    }
    
    public display_success(planet: string) {
        /** Method to display a success message.

        Args:
        planet (str): The planet name in the success message.
        
 */
        //  Code to display success message on LED and play correct sound
        I2C_LCD1602.ShowString("Correct!", 0, 0)
    }
    
    public display_failure(planet: string) {
        /** Method to display a failure message.

        Args:
        planet (str): The planet name in the failure message.
        
 */
        //  Code to display failure message on LED
        I2C_LCD1602.ShowString("Incorrect...", 0, 0)
        I2C_LCD1602.ShowString("Try again.", 0, 1)
    }
    
    public display_lesson_complete(message: string) {
        /** Method to display a lesson complete message.

        Args:
        message (str): The message to be displayed.
        
 */
        I2C_LCD1602.ShowString("Lesson complete!", 0, 1)
    }
    
    public play_success_sound() {
        /** Method to play success sound. */
        //  Code to play the specified sound
        music.tonePlayable(Note.C, music.beat(BeatFraction.Whole))
    }
    
    public play_fail_sound() {
        /** Method to play fail sound. */
        //  Code to play the specified sound
        
    }
    
    public play_rotation_sound() {
        /** Method to play rotation sound. */
        //  Star Wars
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(494, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(494, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(494, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        //  Code to play the specified sound
        
    }
    
    public stop_rotation_sound() {
        /** Method to stop rotation sound. */
        //  Code to stop the specified sound
        
    }
    
    public play_lesson_complete_sound(txt: any, aChar: any) {
        /** Method to play lesson complete sound. */
        //  Code to play the specified sound
        
    }
    
    public myrfind(txt: string, aChar: string): number {
        for (let i = txt.length - 1; i > -1; i += -1) {
            if (txt[i] == aChar) {
                return i
            }
            
        }
        return -1
    }
    
    public display_question(question: string) {
        let row: number;
        /** Method to display the question.

        Args:
        question (str): The question to be displayed.
        
 */
        let pd = new PlanetDetection()
        let oldlastindex = 0
        let lastindex = 0
        let lastcompare = 0
        let j = 0
        //  display = True
        let done = false
        let line = ""
        let lines = []
        //  # # serial.write_line(str(len(question)-1))
        while (lastindex < question.length - 1) {
            lastcompare = 16 + lastindex
            //  # serial.write_line(str(lastcompare))
            if (question.length - 1 < lastcompare) {
                lastcompare = question.length - 1
                done = true
            }
            
            //  serial.write_line("Done is true.")
            if (question[lastcompare] != " ") {
                //  x = 1
                //  self.myrfind("a", "b")
                lastindex = this.myrfind(question.slice(oldlastindex, lastcompare), " ") + oldlastindex
            } else {
                //  serial.write_line(str(lastindex))
                lastindex = lastcompare
            }
            
            if (lastcompare >= question.length - 1) {
                lastindex = question.length
            }
            
            line = question.slice(oldlastindex, lastindex)
            oldlastindex = lastindex
            j += 1
            //  serial.write_line(line)
            lines.push(line)
            if (done) {
                break
            }
            
        }
        let k = 0
        while (pd.detect_planet() != "") {
            if (k > 1 && k % 2 == 0) {
                basic.pause(3000)
                I2C_LCD1602.clear()
            }
            
            row = k % 2
            I2C_LCD1602.ShowString(lines[k], 0, row)
            k += 1
            if (k >= lines.length) {
                basic.pause(3000)
                I2C_LCD1602.clear()
                k = 0
            }
            
        }
    }
    
}
// # ALL MAIN CODE HERE ##
I2C_LCD1602.LcdInit(39)
let av = new AudioVisual()
let question = "What planet is closest to the sun my guy huh answer me bruh come on why don't you be cool and stuff????"
av.display_question(question)
