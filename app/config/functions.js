export const numberWithCommas = (x) => {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

export const timeStamp = (d) => {
	if(d) {
		var date = d.split(' ')[0],
			time = d.split(' ')[1],
			months = [
				'Jan', 'Feb', 'Mar',
				'Apr', 'May', 'Jun',
				'Jul', 'Aug', 'Sep',
				'Oct', 'Nov', 'Dec'
			],
			year = parseInt(date.split('-')[0]),
			month = parseInt(date.split('-')[1]),
			day = parseInt(date.split('-')[2]),
			hour = parseInt(time.split(':')[0]),
			min = parseInt(time.split(':')[1]),
			date = `${months[month - 1]}. ${day}, ${year}`,
			time = `${hour <= 12 ? (hour === 0 ? '12' : hour) : (hour - 12)}:${min} ${hour < 12 ? 'AM' : 'PM'}`;
		return {date, time};
	} else {
		var date = '----',
			time = '----';
		return {date, time};
	}
};

export const timeStampNumeric = (d) => {
	if(d) {
		var date = d.split(' ')[0],
			year = date.split('-')[0],
			month = date.split('-')[1],
			day = date.split('-')[2];
		return `${month}.${day}.${year.slice(-2)}`;
	} else {
		return '----';
	}
}

export const getHourDiff = (date1, date2) => {
	if(!date1 || !date2) {
		return false;
	} else {
		var millis1 = new Date(date1).getTime(),
			millis2 = new Date(date2).getTime(),
			hoursDiff = Math.abs(millis2 - millis1) / 36e5;
			hours = Math.floor(hoursDiff),
			min = Math.floor((hoursDiff * 60) % 60);
		return {hours, min};
	}
}

const radiansToDegrees = (radians) => {
	var pi = Math.PI;
	return radians * (180/pi);
};
	
const shiftRotation = (deg) => {
  if(deg === 0) return deg;
  return 360 - deg;
};

const changeBasis = (deg) => {
  if(deg < 270) {
    return deg + 90;
  } else {
    return 270 - deg;
  }
}

export const getHeading = (a, b) => {
	const radians = Math.atan2(b.y - a.y, b.x - a.x);
	const deg = radiansToDegrees(radians);
	const rotate = shiftRotation(deg);
	return changeBasis(rotate);
};

export const getTotalEarnings = (campaign) => {
	var campaignTraveled = parseFloat(campaign.campaign_traveled),
		payBasic = parseFloat(campaign.campaignDetails.pay_basic),
		payBasicKm = parseFloat(campaign.campaignDetails.pay_basic_km),
		payAdditional = parseFloat(campaign.campaignDetails.pay_additional),
		payAdditionalKm = parseFloat(campaign.campaignDetails.pay_additional_km),
		d = campaignTraveled - payBasicKm,
		d = (d >= 1 ? d : 0),
		totalEarnings = (Math.floor(d / payAdditionalKm) * payAdditional) + (payBasic * (d >= 1 ? 1 : 0));
		return totalEarnings.toFixed(2);
}

export const getTotalWithdrawals = (campaign) => {
	var { payments } = campaign,
		totalWithdrawals = payments.map(p => {
			return p.status === 1 ? parseFloat(p.amount) : 0;
		});

	if(totalWithdrawals.length === 0) {
		return '0.00';
	} else {
		return totalWithdrawals.reduce((total, number) => total + number).toFixed(2);
	}
}

export const checkPendingPayment = (campaign) => {
	var { payments } = campaign,
		pendingAmount = payments.map(p => {
			return p.status === 0 ? parseFloat(p.amount) : 0;
		});

		if(pendingAmount.length === 0) {
			return false;
		} else {
			return pendingAmount.reduce((total, number) => total + number).toFixed(2);
		}
}