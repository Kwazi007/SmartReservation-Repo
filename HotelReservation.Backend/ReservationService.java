import payment.Payment;
import payment.PaymentRepository;
import reservation.ReservationRepository;
import room.RoomRepository;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationProductRepository reservationProductRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional
    public Reservation createReservation(ReservationDto reservationDto) {
        Guest guest = guestRepository.findById(reservationDto.getGuestId()).orElseThrow(() -> new EntityNotFoundException("Guest not found"));
        Room room = roomRepository.findById(reservationDto.getRoomId()).orElseThrow(() -> new EntityNotFoundException("Room not found"));

        Reservation reservation = new Reservation();
        reservation.setGuest(guest);
        reservation.setRoom(room);
        reservation.setCheckInDate(reservationDto.getCheckInDate());
        reservation.setCheckOutDate(reservationDto.getCheckOutDate());

        Reservation savedReservation = reservationRepository.save(reservation);

        // Create reservation products
        for (ReservationProductDto productDto : reservationDto.getProducts()) {
            ReservationProduct product = new ReservationProduct();
            product.setReservation(savedReservation);
            product.setProductName(productDto.getProductName());
            product.setUnitPrice(productDto.getUnitPrice());
            product.setAdultPax(productDto.getAdultPax());
            product.setChildPax(productDto.getChildPax());
            product.setCompPax(productDto.getCompPax());
            product.setTotalAmount(productDto.getTotalAmount());

            reservationProductRepository.save(product);
        }

        return savedReservation;
    }

    @Transactional
    public Payment createPayment(PaymentDto paymentDto) {
        Payment payment = new Payment();
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setAmount(paymentDto.getAmount());
        payment.setDate(paymentDto.getDate());

        return paymentRepository.save(payment);
    }
}
