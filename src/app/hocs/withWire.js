import React from 'react';
import PropTypes from 'prop-types';

export default function withWire(WrappedComponent, dependencies, mapper) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name ||
        'Component';

    function WithWire(props, context) {
        const resolved = dependencies.map(dep => context.get(dep));
        const resolvedProps = mapper(...resolved);

        return React.createElement(WrappedComponent, {
            ...props,
            ...resolvedProps
        });
    }

    WithWire.displayName = `withWire(${componentName})`;

    WithWire.contextTypes = {
        data: PropTypes.object,
        get: PropTypes.func,
        register: PropTypes.func
    };

    return WithWire;
}