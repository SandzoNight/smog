package sit.kmutt.smog.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sit.kmutt.smog.Models.Smog;

@Repository
public interface SmogRepository extends JpaRepository<Smog, Integer> {
    public Smog findTopByOrderByIdDesc();
}
