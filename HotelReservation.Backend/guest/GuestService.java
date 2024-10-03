package guest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    public Guest saveGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public Guest getGuestById(Long id) {
        return guestRepository.findById(id)
                .orElse(null);
    }

    public void deleteGuest(Long id) {
        guestRepository.deleteById(id);
    }
}
