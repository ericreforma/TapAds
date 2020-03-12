export const numberWithCommas = (x, withoutDecimal = false) => {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	if(withoutDecimal) {
		return parts[0];
	} else {
		return parts.join(".");
	}
};

export const getCurrentTime = () => {
  var date = new Date,
    month = (parseInt(date.getMonth()) + 1).toString().padStart(2, "0"),
    day = date.getDate().toString().padStart(2, "0"),
    year = date.getFullYear(),
    hour = date.getHours().toString().padStart(2, "0"),
    min = date.getMinutes().toString().padStart(2, "0"),
    sec = date.getSeconds().toString().padStart(2, "0");

  return `${month}-${day}-${year} ${hour}:${min}:${sec}`;
};

export const timeStamp = (d, alphabetic = false) => {
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
			date = alphabetic
				? `${months[month - 1].toUpperCase()}. ${day}, ${year}`
				: `${months[month - 1]}. ${day}, ${year}`,
			time = `${hour <= 12 ? (hour === 0 ? '12' : hour) : (hour - 12)}:${min} ${hour < 12 ? 'AM' : 'PM'}`;
		return {date, time};
	} else {
		var date = '----',
			time = '----';
		return {date, time};
	}
};

export const getDate = (date) => {
	if(date) {
		var year = date.split('-')[0],
			month = date.split('-')[1].toString().padStart(2, '0'),
			day = date.split('-')[2].toString().padStart(2, '0'),
			date = `${month}-${day}-${year}`;
		return date;
	} else {
		return '---';
	}
}

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

export const getMonthDiff = (date1, date2) => {
	if(!date1 || !date2) {
		return false;
	} else {
		var months,
			date1 = new Date(date1),
			date2 = new Date(date2);

    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
		return months <= 0 ? 0 : months;
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

export const earnUpTo = (c, decimal = false) => {
	const payBasic = parseFloat(c.pay_basic);
	const returnValue = payBasic * getMonthDiff(c.duration_from, c.duration_to);
	return numberWithCommas(returnValue.toFixed(2), decimal);
}

export const totalKmDistance = (c) => {
	const km = c.pay_basic_km;
	return (km * getMonthDiff(c.duration_from, c.duration_to)).toFixed(2);
}

export const getTotalEarnings = (campaign) => {
	const { trips, campaignDetails } = campaign,
		payBasic = parseFloat(campaignDetails.pay_basic),
		payBasicKm = parseFloat(campaignDetails.pay_basic_km),
		dateNow = new Date(),
		dateNowString = `${dateNow.getFullYear()}-${(dateNow.getMonth() + 2).toString().padStart(2, '0')}-${(dateNow.getDate()).toString().padStart(2, '0')}`,
		durationFromNow = getMonthDiff(campaignDetails.duration_from, dateNowString),
		maxEarnings = (durationFromNow == 0 ? payBasic : durationFromNow * payBasic);
		
	var distanceArray = trips.map(t => parseFloat(t.campaign_traveled)),
		distance = distanceArray.length === 0 ? 0 : distanceArray.reduce((total, num) => total + num),
		earnings = Math.floor(distance / payBasicKm) * payBasic;
		
	if(earnings >= maxEarnings) {
		earnings = maxEarnings;
	}

	return earnings.toFixed(2);
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

export const getBonus = (c) => {
	var bonus = 0;
	if(c.completed === 1) {
		bonus = parseFloat(c.campaignDetails.completion_bonus);
	}

	return bonus.toFixed(2);
}

export const getMonthlyVehiclePhoto = (campaignSelected) => {
	const { campaignDetails, vehicleMonthlyUpdate } = campaignSelected,
		from = campaignDetails.duration_from,
		to = campaignDetails.duration_to;
		
	const months = [
			'Jan', 'Feb', 'Mar',
			'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep',
			'Oct', 'Nov', 'Dec'
		],
		fromDate = {
			year: parseInt(from.split('-')[0]),
			month: parseInt(from.split('-')[1])
		},
		toDate = {
			year: parseInt(to.split('-')[0]),
			month: parseInt(to.split('-')[1])
		},
		deadlineDifference = 2;
		monthDiff = toDate.month - fromDate.month + (12 * (toDate.year - fromDate.year)),
		returnData = Array(monthDiff).fill(null).map((m, mIdx) => {
			var month = fromDate.month + mIdx;
			var year = fromDate.year;
			if(month >= 12) {
				year = year + Math.floor(month/12);
				month = month % 12;
			};

			// set deadline date
			var deadline = parseInt(campaignDetails.vehicle_update_date);
			const maxDate = new Date(year, month + 1, 0).getDate();
			if(parseInt(deadline) > maxDate) deadline = maxDate;

			// set 'from' deadline
			var deadlineFrom = deadline - deadlineDifference;
			var monthFrom = month;
			var yearFrom = year;
			var maxDateFrom = new Date(year, month + 1, 0).getDate();
			if(deadlineFrom < 0) {
				monthFrom = month - 1 >= 0 ? month - 1 : 11;
				yearFrom = month - 1 >= 0 ? year : year - 1;
				maxDateFrom = new Date(yearFrom, monthFrom, 0).getDate();
				deadlineFrom += maxDateFrom;
			}

			var deadlineTo = deadline + deadlineDifference;
			var monthTo = month;
			var yearTo = year;
			var maxDateTo = new Date(year, month + 1, 0).getDate();
			if(maxDateTo < deadlineTo) {
				monthTo = month + 1 <= 11 ? month + 1 : 0;
				yearTo = month + 1 <= 11 ? year : year + 1;
				maxDateTo = new Date(yearTo, monthTo, 0).getDate();
				deadlineTo = deadlineTo - maxDateTo;
			}

			const d = new Date();
			const yearNow = d.getFullYear();
			const monthNow = d.getMonth();
			const dateNow = d.getDate();
			let deadlineToday = false;
			if((yearNow >= yearFrom && yearNow <= yearTo)
				&& (monthNow >= monthFrom && monthNow <= monthTo)
				&& (dateNow >= deadlineFrom && dateNow <= deadlineTo)) {
				deadlineToday = true;
			}

			const vehiclePhotos = vehicleMonthlyUpdate.filter(v => {
				const vD = v.created_at.split(' ')[0];
				const vYear = parseInt(vD.split('-')[0]);
				const vMonth = parseInt(vD.split('-')[1]) - 1;
				const vDate = parseInt(vD.split('-')[2]);
				
				if((yearFrom <= vYear && vYear <= yearTo)
					&& (monthFrom <= vMonth && vMonth <= monthTo)
					&& (deadlineFrom <= vDate && vDate <= deadlineTo)) {
					return true;
				}
				return false;
			});

			return {
				monthDuration: `${months[month == 0 ? 11 : month - 1]} - ${months[month]}`,
				deadline: `${months[monthFrom]} ${deadlineFrom} - ${months[monthTo]} ${deadlineTo}`,
				vehiclePhotos,
				deadlineToday
			};
		});

	return returnData;
}

export const getTotalPay = item => {
	const payBasic = parseInt(item.pay_basic);
	const mDiff = getMonthDiff(item.duration_from, item.duration_to);
	return `P${numberWithCommas(payBasic * mDiff, true)}`;
}

export const getSlotAvailable = ({slots, slots_used}) => {
	const slotsAvailable = parseInt(slots) - parseInt(slots_used);
	return `${slotsAvailable} of ${slots}`;
}

export const checkIfCampaignActive = ({dateFrom, dateTo}) => {
	const dNow = new Date().getTime();
	const dFrom = new Date(dateFrom).getTime();
	const dTo = new Date(dateTo).getTime();

	if(dFrom <= dNow && dNow <= dTo) return true;
	return false;
}

export const getHeadingTwoPoints = (coor1, coor2) => {
	const lngDiff = coor2.coords.longitude - coor1.coords.longitude;
	const latDiff = coor2.coords.latitude - coor1.coords.latitude;
	const heading = Math.atan2(lngDiff, latDiff) * 180 / Math.PI;
	const shiftedHeading = heading < 0 ? 360 + heading : heading;
	return shiftedHeading;
}

export const convert12HourTime = (timestamp) => {
	var date = timestamp.split(' ')[0],
		year = parseInt(date.split('-')[0]),
		month = parseInt(date.split('-')[1]),
		day = parseInt(date.split('-')[2]),
		time = timestamp.split(' ')[1],
		hour = parseInt(time.split(':')[0]),
		min = time.split(':')[1],
		dateNow = new Date(),
		dateDB = new Date(year, month - 1, day, time.split(':')[0], time.split(':')[1], time.split(':')[2]),
		yearNow = dateNow.getFullYear(),
		millis = dateDB.getTime(),
		millisNow = dateNow.getTime(),
		hourDiff = Math.abs(millisNow - millis) / 36e5,
		months = [
			'Jan', 'Feb', 'Mar',
			'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep',
			'Oct', 'Nov', 'Dec'
		],
		time;

	if(yearNow > year) {
		time = date.replace(/-/g,'/');
	} else if(hourDiff >= 48) {
		time = `${months[month - 1]} ${day}`;
	} else {
		time = (hour == 0 ? '12' : (
			hour < 12 ? hour : hour - 12
		)) + `:${min} ${hour < 12 ? 'AM' : 'PM'}`;
	}

	return time;
}