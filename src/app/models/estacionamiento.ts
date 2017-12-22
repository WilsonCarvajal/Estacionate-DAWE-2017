export class Estacionamiento {
    estado: string;
    metrosCuadrados: {
        type : number;
        min : [0, 'No puede tener Metros cuadrados menor o igual a 0'] };
}