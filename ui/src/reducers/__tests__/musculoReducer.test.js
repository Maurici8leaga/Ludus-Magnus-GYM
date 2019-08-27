import { CHANGE_MUSCULO } from '../../actions/types';
import musculoReducer from '../musculosReducer';

it('cambiando el estado del musculo', () => {
    const action = {
        type: CHANGE_MUSCULO,
        payload: 'guayaba'
    }

    const nuevoEstado = musculoReducer({}, action);

    expect(nuevoEstado).toEqual({"selectedMusculo": "guayaba"});
                        // aca a diferencia de los demas test el toEqual se coloca dentro de "{}" ya que el state en el musculosReducer esta dentro de {} y no de []
});