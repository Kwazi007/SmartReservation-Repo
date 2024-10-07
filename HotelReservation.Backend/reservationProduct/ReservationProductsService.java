package reservationProduct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationProductsService {

    @Autowired
    private ReservationProductsRepository reservationProductsRepository;

    public List<ReservationProducts> getAllReservationProducts() {
        return reservationProductsRepository.findAll();
    }

    public ReservationProducts saveReservationProduct(ReservationProducts reservationProducts) {
        return reservationProductsRepository.save(reservationProducts);
    }

    public ReservationProducts getReservationProductById(Long reservationId) {
        return reservationProductsRepository.findById(reservationId)
                .orElse(null);
    }

    public void deleteReservationProduct(Long reservationId) {
        reservationProductsRepository.deleteById(reservationId);
    }
}
