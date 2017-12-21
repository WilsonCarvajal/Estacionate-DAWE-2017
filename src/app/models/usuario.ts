export class Usuario {
    set rut(value: string) {
        this._rut = value;
    }

    set contrasenia(value: string) {
        this._contrasenia = value;
    }

    //sd
    set nombre(value: string) {
        this._nombre = value;
    }

    set apellido_paterno(value: string) {
        this._apellido_paterno = value;
    }

    set apellido_materno(value: string) {
        this._apellido_materno = value;
    }

    set email(value: { type: string; lowercase: true }) {
        this._email = value;
    }

    set telefono(value: string) {
        this._telefono = value;
    }

    set direccion(value: string) {
        this._direccion = value;
    }
    get rut(): string {
        return this._rut;
    }

    get contrasenia(): string {
        return this._contrasenia;
    }

    get nombre(): string {
        return this._nombre;
    }

    get apellido_paterno(): string {
        return this._apellido_paterno;
    }

    get apellido_materno(): string {
        return this._apellido_materno;
    }

    get email(): { type: string; lowercase: true } {
        return this._email;
    }

    get telefono(): string {
        return this._telefono;
    }

    get direccion(): string {
        return this._direccion;
    }
    private _rut: string;
    private _contrasenia: string;
    private _nombre: string;
    private _apellido_paterno: string;
    private _apellido_materno: string;
    private _email: {type: string, lowercase: true};
    private _telefono: string;
    private _direccion: string;
    contructor() {}

    // Setters
    public setRut(rut: string) {
        this._rut = rut;
    }
    public setContrasenia(contrasenia: string) {
        this._contrasenia = contrasenia;
    }

    // Getters

    public getRut(rut: string) {
        return rut;
    }
}
