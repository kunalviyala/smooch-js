import { Provider } from 'react-redux';
import React, { PropTypes, Component } from 'react';

// Element with context:
// component = TestUtils.renderIntoDocument(<ParentComponentWithContext context={ context } 
//                                                                      store={ mockedStore }
//                                                                      <ActionComponent {...props} />
//                                          </ParentComponentWithContext>);

// If you need to test functions:
// component = TestUtils.renderIntoDocument(<ParentComponentWithContext context={ context } 
//                                                                      store={ mockedStore }
//                                                                      withRef={ true }
//                                                                      <ActionComponent {...props} />
//                                          </ParentComponentWithContext>);
// component.refs.childElement.someFunction();

export class ParentComponentWithContext extends Component {

    static propTypes = {
        context: PropTypes.object.required,
        store: PropTypes.object.required,
        withRef: PropTypes.bool
    };

    static childContextTypes = {
        app: PropTypes.object,
        settings: PropTypes.object,
        ui: PropTypes.object
    };

    getChildContext() {
        return this.props.context;
    }

    render() {
        // If we need to use functions on the child element, then add a 'ref' propType
        const childElement = this.props.withRef ? React.Children.map(
            this.props.children, function(child) {
                return React.cloneElement(child, {
                    ref: 'childElement'
                });
            }) : this.props.children;
        return (
            <Provider store={ this.props.store }>
                <div>
                    { childElement }
                </div>
            </Provider>
            );
    }
}
