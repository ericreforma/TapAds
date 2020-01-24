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

import {URL} from '../../config/variables';
import NavigationService from '../../services/navigation';

import AsyncImage from '../../components/AsyncImage';
import EditVehicleModal from './Modal/EditVehicleModal';
import theme from '../../styles/theme.style';

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
  Label: ({text}) => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Montserrat-Regular',
          color: theme.COLOR_NORMAL_FONT
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
          }}
        >
          <VehicleText.Header.Right color="white">
            -- No vehicle listed --
          </VehicleText.Header.Right>
        </View>
      );

    return (
      <View>
        {data.filter((d, dIdx) => dIdx < vehicleDisplayLength)
        .map((d, dIdx) =>
          <CardVehicleContainer key={d.id}>
            <ImageSection d={d} />
            <CardVehicleInfo d={d} />
          </CardVehicleContainer>
        )}

        <SeeMoreButton 
          decision={vehicleDisplayLength < data.length}
          incVehicleDisplayLength={() => setVehicleDisplayLength(vehicleDisplayLength + 4)}
        />
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
    const dimension = 130;

    const getActiveDot = index => {
      return photo.map((p, pIdx) => {
        if(pIdx === index) return true;
        return false;
      });
    }

    const [navDots, setNavDots] = useState(getActiveDot(0));

    return (
      <View style={{width: dimension}}>
        <Carousel
          data={photo}
          renderItem={renderVehicleImage}
          layout={'default'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          sliderWidth={dimension}
          itemHeight={dimension}
          itemWidth={dimension}
          onBeforeSnapToItem={sIdx => setNavDots(getActiveDot(sIdx))}
        />

        <NavDots dots={navDots} />
        <EditVehicleModal d={d} update={update} />
      </View>
    )
  }

  const renderVehicleImage = ({item}) => {
    const dimension = 130;
    return <AsyncImage
      style={{
        height: dimension,
        width: dimension
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
    const plateNumber = d.plate_number ? d.plate_number : '----';
    const textToDisplay = `Plate Number: ${plateNumber}`;

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
          <VehicleText.Label text={textToDisplay} />
        </View>
      </View>
    )
  }

  const CardVehicleBody = ({d}) => {
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