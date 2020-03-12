import React, { useState, useEffect } from 'react';
import { 
  PickerButton,
  PickerButtonLabelWrapper,
  PickerButtonLabel,
  PickerButtonCaret,
  PickerModal,
  PickerModalContainer,
  PickerModalItemLabel,
  PickerModalHeader,
  PickerModalHeaderLabel,
  PickerModalBody,
  PickerModalItem,
  PickerModalItemWrapper
} from './PickerContentStyledComponents';
import { IfElse, Then } from '../../../components/IfElse';

const Picker = ({
  placeholder = "Hello! I'm a picker!",
  displayPlaceHolder = true,
  defaultValue = false,
  onChangeValue,
  value = false,
  data
}) => {
  const firstLabel = defaultValue !== false
    ? data.find(d => d.value === defaultValue).label
    : placeholder
  const defaultSelectedValue = defaultValue !== false ? defaultValue : false;
  const [buttonLabel, setButtonLabel] = useState(firstLabel);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(value !== false)
      setValue(data.find(d => d.value === value));
  }, [value]);

  const toggleModal = () => setModalVisible(!modalVisible);

  const pickerOnPress = d => () => {
    setValue(d);
    if(onChangeValue) onChangeValue(d.value);
    toggleModal();
  }

  const setValue = d => {
    setButtonLabel(d.label);
    setSelectedValue(d.value);
  }

  return (
    <>
      <PickerButton onPress={toggleModal}>
        <PickerButtonCaret name="caret-left" />

        <PickerButtonLabelWrapper>
          <PickerButtonLabel>
            {buttonLabel}
          </PickerButtonLabel>
        </PickerButtonLabelWrapper>

        <PickerButtonCaret name="caret-right" />
      </PickerButton>

      <PickerModal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}>
        <PickerModalContainer>
          <IfElse condition={displayPlaceHolder}>
            <Then>
              <PickerModalHeader>
                <PickerModalHeaderLabel>
                  {placeholder}
                </PickerModalHeaderLabel>
              </PickerModalHeader>
            </Then>
          </IfElse>
          
          <PickerModalBody>
            <PickerModalItemWrapper>
              {data.map((d, dIdx) =>
                <PickerModalItem
                  active={selectedValue === d.value}
                  onPress={pickerOnPress(d)}
                  key={dIdx}>
                  <PickerModalItemLabel
                    active={selectedValue === d.value}>
                    {d.label}
                  </PickerModalItemLabel>
                </PickerModalItem>
              )}
            </PickerModalItemWrapper>
          </PickerModalBody>
        </PickerModalContainer>
      </PickerModal>
    </>
  )
}

export default Picker;