import GreetingService from '../services/greetingService';
import HttpService from '../services/httpService';

const dependencies = {
    data: {},
    get(key) {
        return this.data[key];
    },
    register(key, value) {
        this.data[key] = value;
    }
};

export function registerDependencies() {
    dependencies.register('greetingService', new GreetingService());
    dependencies.register('httpService', new HttpService());
}

export default dependencies;