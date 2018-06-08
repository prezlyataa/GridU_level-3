import GreetingService from '../services/greetingService';

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
}

export default dependencies;