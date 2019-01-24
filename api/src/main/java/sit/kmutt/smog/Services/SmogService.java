package sit.kmutt.smog.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sit.kmutt.smog.Models.Smog;
import sit.kmutt.smog.Repositories.SmogRepository;

@Service
public class SmogService implements  SmogServiceInterface {
    @Autowired
    SmogRepository smogRepository;

    @Override
    public Smog getRecentSmog() {
        return smogRepository.findTopByOrderByIdDesc();
    }
}
