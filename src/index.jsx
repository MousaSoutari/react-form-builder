/**
 * <ReactFormBuilder />
 */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import Preview from './preview';
import Toolbar from './toolbar';
import FormGenerator from './form';
import store from './stores/store';
import Registry from './stores/registry';
import AppLocale from './language-provider';
// import "devextreme/dist/css/dx.light.css";

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
      showToolbar: false,
      otherItem: null,
    };
    this.editModeOn = this.editModeOn.bind(this);
    this.toggleToolbar = this.toggleToolbar.bind(this);
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  toggleToolbar(show, otherItem = null) {
    this.setState({
      showToolbar: show,
      otherItem,
    });
  }

  render() {
    const toolbarProps = {
      showDescription: this.props.show_description,
      showToolbar: this.state.showToolbar,
      toggleToolbar: this.toggleToolbar,
      otherItem: this.state.otherItem,
    };

    const language = this.props.locale ? this.props.locale : 'en';
    const currentAppLocale = AppLocale[language];
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <div>
            {/* <div>
           <p>
             It is easy to implement a sortable interface with React DnD. Just make
             the same component both a drag source and a drop target, and reorder
             the data in the <code>hover</code> handler.
           </p>
           <Container />
         </div> */}
            <div className="react-form-builder clearfix">
              <div>
                <Preview
                  files={this.props.files}
                  manualEditModeOff={this.manualEditModeOff.bind(this)}
                  showCorrectColumn={this.props.showCorrectColumn}
                  parent={this}
                  data={this.props.data}
                  url={this.props.url}
                  saveUrl={this.props.saveUrl}
                  onLoad={this.props.onLoad}
                  onPost={this.props.onPost}
                  editModeOn={this.editModeOn}
                  editMode={this.state.editMode}
                  variables={this.props.variables}
                  toggleToolbar={this.toggleToolbar}
                  registry={Registry}
                  editElement={this.state.editElement}
                  renderEditForm={this.props.renderEditForm}
                  // rightComponent={this.props.rightComponent}
                  bottomComponent={this.props.bottomComponent}
                  saveAlways={this.props.saveAlways}
                />
                <Toolbar
                  {...toolbarProps}
                  customItems={this.props.customToolbarItems}
                />
              </div>
            </div>
          </div>
        </IntlProvider>
      </DndProvider>
    );
  }
}

function ReactFormGenerator(props) {
  const language = props.locale ? props.locale : 'en';
  const currentAppLocale = AppLocale[language];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <FormGenerator {...props} />
    </IntlProvider>
  );
}

const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;

export default FormBuilders;

export {
  ReactFormBuilder,
  ReactFormGenerator,
  store as ElementStore,
  Registry,
};
