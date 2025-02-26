package mx.edu.utez.Usuarios.controller.Bitacora.DTO;

import java.time.LocalDate;


public class BitacoraDTO {
    private Long id;
    private LocalDate fechamovimiento;
    private String movimiento;
    private String nombreUsuario;

    public BitacoraDTO(Long id, LocalDate fechamovimiento, String movimiento, String nombreUsuario) {
        this.id = id;
        this.fechamovimiento = fechamovimiento;
        this.movimiento = movimiento;
        this.nombreUsuario = nombreUsuario;
    }


}