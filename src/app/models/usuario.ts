export class Usuario {
    public rut: string;
    public contrasenia: string;
    public nombre: string;
    public apellido_paterno: string;
    public apellido_materno: string;
    public email: {type: string, lowercase: true};
    public telefono: string;
    public direccion: string;
    contructor() {}

    // Setters
    public setRut(rut: string) {
        this.rut = rut;
    }
    public setContrasenia(contrasenia: string) {
        this.contrasenia = contrasenia;
    }

    // Getters

    public getRut(rut: string) {
        return rut;
    }
}
