import GreetingService from '../services/greetingService';
import HttpService from '../services/httpService';
import AuthService from '../services/authService';

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
    dependencies.register('authService', new AuthService());
}

export default dependencies;