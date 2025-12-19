// utils/dateUtils.js
export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getCurrentMonth() {
    return new Date().getMonth()
}

export function getCurrentYear() {
    return new Date().getFullYear()
}

export function getCurrentDate() {
    return new Date().getDate()
}

export function getCurrentDayInMonthIndex (year, month, day) {
    return new Date(year, month, day).getDay()
}   

export function getCurrentDateToLocaleString(year,month,day) {
    return new Date(year,month,day).toLocaleDateString()
}

export function getFirstDayOfMonth(year, monthIndex) {
    // Returns 0-6 where 0 = Monday, 6 = Sunday
    return new Date(year, monthIndex, 1).getDay();
}

export function formatDate(year, monthIndex, day) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Validate inputs
    if (monthIndex < 0 || monthIndex > 11) {
        throw new Error("Month index must be between 0 and 11");
    }
    
    if (day < 1 || day > 31) {
        throw new Error("Day must be between 1 and 31");
    }
    
    console.log(`${day} ${monthNames[monthIndex]} ${year}`)
    return `${day} ${monthNames[monthIndex]} ${year}`;
};

export function formatDate2(year, monthIndex, day) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Validate inputs
    if (monthIndex < 0 || monthIndex > 11) {
        throw new Error("Month index must be between 0 and 11");
    }
    
    if (day < 1 || day > 31) {
        throw new Error("Day must be between 1 and 31");
    }
    
    console.log(`${day} ${monthNames[monthIndex]} ${year}`)
    return `${monthNames[monthIndex]} ${day} ${year}`;
}

export function getDatePriority (dateString) {
  // Parse the date string "Sep 28 2025"
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    const parts = dateString.split(' ');
    const month = months[parts[0]];
    const day = parseInt(parts[1]);
    const year = parseInt(parts[2]);
    
    // Create Date objects
    const targetDate = new Date(year, month, day);
    const currentDate = new Date();
    
    // Reset time parts to compare only dates
    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Determine priority
    if (daysDiff < 0) {
        return "Overdue"; // Date is in the past
    } else if (daysDiff <= 3) {
        return "High"; // Due in 3 days or less
    } else if (daysDiff <= 7) {
        return "Medium"; // Due in 4-7 days
    } else {
        return "Low"; // Due in more than 7 days
    }
};