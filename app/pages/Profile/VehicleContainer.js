import React, { 
  useState,
  useEffect
} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';

import {URL, VEHICLE} from '../../config/variables';
import NavigationService from '../../services/navigation';

import AsyncImage from '../../components/AsyncImage';
import EditVehicleModal from './Modal/EditVehicleModal';
import theme from '../../styles/theme.style';
import {
  VehicleTypeWrapper,
  VehicleTypeImage,
  VehicleTypeImageWrapper,
  VehicleTypeLabel
} from './VehicleContainerStyledComponents';

const dim = 140;
const vehicleType = id => Object.values(VEHICLE.TYPE).find(t => t.id === id);
const vehicleClass = id => Object.values(VEHICLE.CLASS).find(c => c.id === id);

const vehicleFormat = [
  {name: 'model', label: 'Model'},
  {name: 'year', label: 'Year'},
  {name: 'campaign_name', label: 'Campaign'}
];

const vehicleCampaignColor = [
  theme.COLOR_YELLOW,
  theme.COLOR_GREEN,
  theme.COLOR_RED
];

const VehicleText = {
  Manufacturer: ({text}) => {
    return (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Montserrat-Bold',
          color: theme.COLOR_NORMAL_FONT,
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Label: ({text, color, small}) => {
    return (
      <Text
        style={{
          fontSize: small ? 9 : 12,
          fontFamily: 'Montserrat-Regular',
          color: color ? color : theme.COLOR_NORMAL_FONT
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Common: ({text}) => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Montserrat-Bold',
          color: theme.COLOR_NORMAL_FONT
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Campaign: ({text, color}) => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Montserrat-Bold',
          color
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Header: {
    Left: ({text}) => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(15),
            color: theme.COLOR_WHITE
          }}
          numberOfLines={1}
        >{text}</Text>
      )
    },
    Right: ({text, url, onPress}) => {
      const fontColor = url ? theme.COLOR_PINK : theme.COLOR_WHITE;
      const buttonDisable = url ? false : true;
      const fontFamily = url ? 'Montserrat-Medium' : 'Montserrat-Bold';
      const fontSize = url ? RFValue(13) : RFValue(15);
  
      const redirectFunction = e => NavigationService.navigate(url)
  
      return (
        <TouchableOpacity
          disabled={buttonDisable}
          onPress={onPress ? onPress : redirectFunction}
        >
          <Text
            style={{
              fontFamily,
              fontSize,
              color: fontColor
            }}
            numberOfLines={1}
          >{text}</Text>
        </TouchableOpacity>
      );
    },
    Divider: () => {
      return (
        <Text style={{
          fontFamily: 'Montserrat-Bold',
          color: theme.COLOR_PINK,
          paddingHorizontal: 5
        }}>|</Text>
      );
    }
  }
}

const VehicleContainer = ({user, loader, update}) => {
  const [data, setData] = useState(user.vehicles);
  const [loading, setLoading] = useState(loader);

  useEffect(() => {
    setData(user.vehicles);
  }, [user.vehicles]);

  useEffect(() => {
    setLoading(loader);
  }, [loader]);

  const Container = ({children}) => {
    return (
      <View
      style={{
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
      }}
      >{children}</View>
    )
  }

  const ContainerHeader = ({children}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3
        }}
      >{children}</View>
    )
  }

  const HeaderRightSection = () => {
    const filterOnPress = e => {
      alert('Filter pressed');
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <VehicleText.Header.Right
          text="Add Vehicle"
          url="Addvehicle"
        />

        <VehicleText.Header.Divider />

        <VehicleText.Header.Right
          url
          text="Filter"
          onPress={filterOnPress}
        />
      </View> 
    )
  }

  const ContainerBody = () => {
    const [vehicleDisplayLength, setVehicleDisplayLength] = useState(4);

    if(loading)
      return (
        <ActivityIndicator color="#000" style={{height: 75}} />
      );

    if(data.length === 0)
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20
          }}>
          <VehicleText.Header.Right color="white">
            -- No vehicle listed --
          </VehicleText.Header.Right>
        </View>
      );

    return (
      <View>
        {data.filter((d, dIdx) => dIdx < vehicleDisplayLength)
        .map((d, dIdx) =>
          <EditVehicleModal
            update={update}
            key={d.id}
            d={d}>
            <CardVehicleContainer>
              <ImageSection d={d} />
              <CardVehicleInfo d={d} />
            </CardVehicleContainer>
          </EditVehicleModal>
        )}

        <SeeMoreButton 
          incVehicleDisplayLength={() => setVehicleDisplayLength(vehicleDisplayLength + 4)}
          decision={vehicleDisplayLength < data.length} />
      </View>
    );
  }

  const CardVehicleContainer =  ({children}) => {
    return (
      <View
        style={{
          backgroundColor: theme.COLOR_WHITE,
          borderRadius: 15,
          overflow: 'hidden',
          marginVertical: 7,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >{children}</View>
    )
  }

  const ImageSection = ({d}) => {
    const {photo} = d;

    const getActiveDot = index => {
      return photo.map((p, pIdx) => {
        if(pIdx === index) return true;
        return false;
      });
    }

    const [navDots, setNavDots] = useState(getActiveDot(0));

    return (
      <View style={{width: dim}}>
        <Carousel
          data={photo}
          renderItem={renderVehicleImage}
          layout={'default'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          sliderWidth={dim}
          itemHeight={dim}
          itemWidth={dim}
          onBeforeSnapToItem={sIdx => setNavDots(getActiveDot(sIdx))} />

        <NavDots dots={navDots} />
        <VehicleTypeWrapper>
          <VehicleTypeImage
            source={vehicleClass(d.vehicle.classification).icon.white} />
          
          <VehicleTypeLabel>
            {vehicleType(d.type).name.toUpperCase()}
          </VehicleTypeLabel>
        </VehicleTypeWrapper>
        {/* <EditVehicleModal update={update} d={d} /> */}
      </View>
    )
  }

  const renderVehicleImage = ({item}) => {
    return <AsyncImage
      style={{
        height: dim,
        width: dim
      }}
      source={{uri: `${URL.SERVER_MEDIA}/${item.url}`}}
    />
  }

  const NavDots = ({dots}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -20
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {dots.map((vi, viIdx) =>
              <View
                key={viIdx}
                style={{
                  backgroundColor: vi ? theme.COLOR_BLUE : theme.COLOR_WHITE,
                  elevation: 5,
                  height: 7,
                  width: 7,
                  borderRadius: 10,
                  marginHorizontal: 1.75
                }}
              ></View>
            )}
          </View>
        </View>
      </View>
    )
  }

  const CardVehicleInfo = ({d}) => {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <CardVehicleHeader d={d} />
        <CardVehicleBody d={d} />
      </View>
    )
  }
  
  const CardVehicleHeader = ({d}) => {
    const plateNumber = d.plate_number ? d.plate_number : '--no plate number--';

    return (
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 7,
            borderBottomWidth: 2,
            borderBottomColor: theme.COLOR_LIGHT_BLUE
          }}
        >
          <VehicleText.Manufacturer text={d.vehicle.manufacturer} />
          <View
            style={{
              padding: 3,
              marginTop: 3,
              borderRadius: 5,
              alignSelf: 'flex-start',
              backgroundColor: d.plate_number ? theme.COLOR_GREEN : theme.COLOR_RED,
            }} >
            <VehicleText.Label
              small
              text={plateNumber}
              color={theme.COLOR_WHITE} />
          </View>
        </View>
      </View>
    )
  }

  const CardVehicleBody = ({d}) => {
    console.log(d);

    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 7,
          paddingBottom: 12
        }}
      >
        {vehicleFormat.map((v, vIdx) =>
          <CardVehicleBodyContent
            key={vIdx}
            name={v.name}
            label={v.label}
            row={d}
          />
        )}
      </View>
    )
  }

  const CardVehicleBodyContent = ({name, label, row}) => {
    const common = name === 'campaign_name' ? (
        row[name] ? row[name] : 'none'
      ) : row.vehicle[name];

    const color = name === 'campaign_name' ? (
        row[name]
        ? vehicleCampaignColor[row.campaign_request_status]
        : vehicleCampaignColor[2]
      ) : null;

    const CommonText = () => {
      if(name === 'campaign_name')
        return <VehicleText.Campaign
          text={common}
          color={color}
        />

      return <VehicleText.Common
        text={common}
      />
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <View
          style={{
            width: 80
          }}
        >
          <VehicleText.Label text={label} />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end'
          }}
        >
          <CommonText />
        </View>
      </View>
    )
  }
  
  const SeeMoreButton = ({decision, incVehicleDisplayLength}) => {
    if(decision) {
      return (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 7
          }}
          onPress={incVehicleDisplayLength}
        >
          <VehicleText.Header.Right text="see more" />
        </TouchableOpacity>
      )
    }

    return null;
  }

  return (
    <Container>
      <ContainerHeader>
        <VehicleText.Header.Right
          text="Listed Vehicles" />
        <HeaderRightSection />
      </ContainerHeader>
      <ContainerBody />
    </Container>
  );
};

export default VehicleContainer;