import React, { Component } from 'react';
import { View, Text, CheckBox, TouchableOpacity } from 'react-native';

/*
  This is CheckboxGroup Component
*/

class CheckboxGroup extends Component {

  state = {
    items: [],
    selectedValue: []
  };

  componentWillMount() {
    const { items, selectedItems } = this.props;
    const { selectedValue } = this.state;
    for (let i = 0; i < selectedItems.length; i++) {
      items.forEach(checkboxItem => {
        if (checkboxItem.key === selectedItems[i]) {
          selectedValue.push(checkboxItem);
        }
      });
    }
    //console.log(selectedValue);
    this.setState({
      items,
      selectedValue
    });
  }

  onChangeValue(item) {
    const { disableCheckGroup } = this.props;
    if (disableCheckGroup) {
        return;
    }

    const { selectedValue } = this.state;

    let haveItem = false;
    if (this.props.multipleChoice) {
      selectedValue.forEach((selectedItem, i) => {
        if (selectedItem.key === item.key) {
          selectedValue.splice(i, 1);
          haveItem = true;
        }
      });
      if (!haveItem) {
        selectedValue.push(item);
      }
    } else {
      selectedValue.forEach((selectedItem, i) => {
        if (selectedItem.key === item.key) {
          haveItem = true;
        }
        selectedValue.splice(i, 1);
      });
      if (!haveItem) {
        selectedValue.push(item);
      }
    }

    this.setState({
      selectedValue
    });

    this.props.onSelect(this.state.selectedValue);
  }


  isItemSelected(item) {
    let isSelected = false;
    this.state.selectedValue.forEach(value => {
      if (value.key === item.key) {
        isSelected = true;
      }
    });

    return isSelected;
  }

  render() {
    const { container, mainLabelStyle } = styles;
    return (
      <View style={[container, this.props.checkboxGroupContainerStyle]}>
        <Text style={mainLabelStyle}>
          {this.props.label}
        </Text>
        {Object.keys(this.state.items).map((key) => {
            return (
              <CustomCheckBox
                key={key}
                label={this.state.items[key].label}
                value={this.state.items[key].value}
                isSelected={this.isItemSelected(this.state.items[key])}
                onChange={() => this.onChangeValue(this.state.items[key])}
                disabled={this.props.disableCheckGroup}
                checkboxContainerStyle={this.props.checkboxContainerStyle}
              />
            );
        })}
        {this.props.children}
      </View>
    );
  }
}

export const CustomCheckBox = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={props.disabled ? 1 : 0.7}
        onPress={props.onChange}
        style={[styles.checkboxContainer, props.checkboxContainerStyle]}
      >
        <Text style={styles.labelStyle}>{props.leftLabel}</Text>
          <CheckBox
            disabled={props.disabled}
            value={props.isSelected}
            onValueChange={props.onChange}
          />
          <Text style={styles.labelStyle}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    container: {
      flex: 1,
      width: '100%',
      borderWidth: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    mainLabelStyle: {
      paddingLeft: 10,
      fontSize: 12,
      textAlign: 'left',
      color: '#95989a'
    },
    checkboxContainer: {
      alignSelf: 'center',
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    labelStyle: {
      alignSelf: 'center',
      fontSize: 10,
      textAlign: 'left'
    }
};


export { CheckboxGroup };
