import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeFunc,
  value,
  isEditable = true,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#000'}}
          secureTextEntry={true}
          onChangeText={onChangeFunc}
          value={value}
          editable={isEditable}
          placeholderTextColor="#000"
        />
      ) : inputType == 'select' ? (
        <Picker selectedValue={value} onValueChange={onChangeFunc}>
          <Picker.Item label="Laki-Laki" value="Laki-Laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#000'}}
          onChangeText={onChangeFunc}
          value={value}
          editable={isEditable}
          placeholderTextColor="#000"
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#04AD48', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
