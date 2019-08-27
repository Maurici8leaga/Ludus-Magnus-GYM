import {changeMusculo} from '../index';
import {CHANGE_MUSCULO} from '../types';

describe('cambio de musculo', () => {
    it('verdadero type', () => {
        const action = changeMusculo();

        expect(action.type).toEqual(CHANGE_MUSCULO);
    });

    it('probando el payload', () => {
        const action = changeMusculo('guayaba');

        expect(action.payload).toEqual('guayaba');
    })
});
