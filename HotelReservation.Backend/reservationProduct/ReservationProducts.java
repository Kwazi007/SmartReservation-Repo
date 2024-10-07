@Entity
@Table(name = "reservation_products")
public class ReservationProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private Integer adultPax;

    @Column(nullable = false)
    private Integer childPax;

    @Column(nullable = false)
    private Integer compPax;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    // Getters and setters
}
