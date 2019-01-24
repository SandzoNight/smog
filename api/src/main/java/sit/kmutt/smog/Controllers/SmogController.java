package sit.kmutt.smog.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sit.kmutt.smog.Models.Smog;
import sit.kmutt.smog.Services.SmogService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class SmogController {
    @Autowired
    SmogService smogService;

    @GetMapping("/smog")
    public ResponseEntity<Smog> getUser(HttpServletRequest request) {

    @GetMapping("/stats")
    public ResponseEntity<Smog> getSmogStats(HttpServletRequest request) {
        return new ResponseEntity<Smog>(smogService.getRecentSmog(), HttpStatus.OK);
    }
}
