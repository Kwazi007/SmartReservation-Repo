@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    private Hotel hotel;

    @Column(nullable = false)
    private String roomType;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private BigDecimal rate;

    // Getters and setters
}
