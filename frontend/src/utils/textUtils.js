export function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str; // Return original string if it's already within the limit
    } else {
        // Truncate and add ellipsis
        return str.slice(0, maxLength - 3) + "..."; 
    }
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}