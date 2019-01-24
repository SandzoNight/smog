package sit.kmutt.smog.Models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "data")
public class Smog {
    @Id
    private int id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timelog;

    @NotBlank
    private String name;

    @NotBlank
    private String ip;

    @NotNull
    private int pm1_cf;

    @NotNull
    private int pm25_cf;

    @NotNull
    private int pm10_cf;

    @NotNull
    private int pm1;

    @NotNull
    private int pm25;

    @NotNull
    private int pm10;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getTimelog() {
        return timelog;
    }

    public void setTimelog(Date timelog) {
        this.timelog = timelog;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getPm1_cf() {
        return pm1_cf;
    }

    public void setPm1_cf(int pm1_cf) {
        this.pm1_cf = pm1_cf;
    }

    public int getPm25_cf() {
        return pm25_cf;
    }

    public void setPm25_cf(int pm25_cf) {
        this.pm25_cf = pm25_cf;
    }

    public int getPm10_cf() {
        return pm10_cf;
    }

    public void setPm10_cf(int pm10_cf) {
        this.pm10_cf = pm10_cf;
    }

    public int getPm1() {
        return pm1;
    }

    public void setPm1(int pm1) {
        this.pm1 = pm1;
    }

    public int getPm25() {
        return pm25;
    }

    public void setPm25(int pm25) {
        this.pm25 = pm25;
    }

    public int getPm10() {
        return pm10;
    }

    public void setPm10(int pm10) {
        this.pm10 = pm10;
    }
}
