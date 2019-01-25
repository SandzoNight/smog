package sit.kmutt.smog.Models;

public class SmogStats {
    float average;
    String time;

    public SmogStats() {
    }

    public SmogStats(float average, String time) {
        this.average = average;
        this.time = time;
    }

    public float getAverage() {
        return average;
    }

    public void setAverage(float average) {
        this.average = average;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
