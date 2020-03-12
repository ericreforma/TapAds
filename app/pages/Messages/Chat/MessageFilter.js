import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FilterButton,
  FilterButtonLabel,
  FilterButtonIcon,
  FilterModal,
  FilterModalContainer,
  FilterModalPickerWrapper,
  FilterLabel,
  FilterActionWrapper,
  FilterProceedButton,
  FilterActionButtonLabel,
  FilterCancelButton
} from './MessageFilterStyledComponents';
import { Picker } from '../../../components/App';

const MessageFilter = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [campaignDataValue, setCampaignDataValue] = useState(0);
  const [origCampaignValue, setOrigCampaignValue] = useState(0);
  const [userVehicleData, setUserVehicleData] = useState([]);
  const [userVehicleDataValue, setUserVehicleDataValue] = useState(0);
  const [origVehicleValue, setOrigVehicleValue] = useState(0);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaignData();
  }, []);

  const getCampaignData = () => {
    const newCampaignData = [];
    const newUserVehicleData = [];
    const myList = props.mylist.map(l => l);
    const newCampaigns = myList.filter(l => l.client_id === props.cid);
    newCampaigns.map(l => {
      const { name, id } = l.campaignDetails
      const cData = { label: name, value: id };
      const checkIfExist = newCampaignData.find(c => c.value === id);
      if(!checkIfExist)
        newCampaignData.push(cData);
    });
    newCampaignData.unshift({label: 'Default', value: 0});
    newUserVehicleData.push({label: 'Default', value: 0});

    setCampaignData(newCampaignData);
    setUserVehicleData(newUserVehicleData);
    setCampaigns(newCampaigns);
  }

  const toggleModal = () => setModalVisible(!modalVisible);

  const campaignDataOnChange = newCampaignDataValue => {
    const newUserVehicleData = [];
    var newUserVehicleDataValue = 0;
    if(newCampaignDataValue !== 0) {
      campaigns.filter(c => c.campaign_id === newCampaignDataValue).map(c => {
        const { plate_number, id } = c.vehicle;
        const vData = { label: plate_number, value: id };
        const checkIfExist = newUserVehicleData.find(v => v.value === id);
        if(!checkIfExist)
          newUserVehicleData.push(vData);
      });
      newUserVehicleDataValue = newUserVehicleData[0].value;
    } else {
      newUserVehicleData.push({ label: 'Default', value: 0 });
    }

    setCampaignDataValue(newCampaignDataValue);
    setUserVehicleData(newUserVehicleData);
    setUserVehicleDataValue(newUserVehicleDataValue);
  }

  const userVehicleOnChange = newUserVehicleDataValue => {
    setUserVehicleDataValue(newUserVehicleDataValue);
  }

  const continueOnPress = () => {
    toggleModal();
    
    if(origCampaignValue !== campaignDataValue
      || origVehicleValue !== userVehicleDataValue) {
      setOrigCampaignValue(campaignDataValue);
      setOrigVehicleValue(userVehicleDataValue);
      const form = {
        campaign_id: campaignDataValue,
        user_vehicle_id: userVehicleDataValue
      };
  
      props.filteredChat(form);
    }
  }

  const cancelOnPress = () => {
    toggleModal();
    setTimeout(() => {
      setCampaignDataValue(origCampaignValue);
      setUserVehicleDataValue(origVehicleValue);
    }, 300);
  }

  return (
    <>
      <FilterButton
        onPress={toggleModal}>
        <FilterButtonLabel>
          Chat filters
        </FilterButtonLabel>

        <FilterButtonIcon name="caret-down" />
      </FilterButton>

      <FilterModal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}>
        <FilterModalContainer>
          <FilterModalPickerWrapper>
            <FilterLabel>
              Campaign
            </FilterLabel>

            <Picker
              onChangeValue={campaignDataOnChange}
              defaultValue={campaignDataValue}
              value={campaignDataValue}
              placeholder="Campaign"
              data={campaignData}
              displayPlaceHolder={false} />
          </FilterModalPickerWrapper>

          <FilterModalPickerWrapper>
            <FilterLabel>
              Vehicle
            </FilterLabel>

            <Picker
              onChangeValue={userVehicleOnChange}
              defaultValue={userVehicleDataValue}
              value={userVehicleDataValue}
              placeholder="Vehicle"
              data={userVehicleData}
              displayPlaceHolder={false} />
          </FilterModalPickerWrapper>

          <FilterActionWrapper>
            <FilterProceedButton
              onPress={continueOnPress}>
              <FilterActionButtonLabel>
                Continue
              </FilterActionButtonLabel>
            </FilterProceedButton>

            <FilterCancelButton
              onPress={cancelOnPress}>
              <FilterActionButtonLabel>
                Cancel
              </FilterActionButtonLabel>
            </FilterCancelButton>
          </FilterActionWrapper>
        </FilterModalContainer>
      </FilterModal>
    </>
  )
}

const mapStateToProps = state => ({
  mylist: state.campaignReducer.mylist
});

export default connect(mapStateToProps)(MessageFilter);