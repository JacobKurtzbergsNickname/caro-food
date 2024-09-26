// // TypeScript declaration to avoid type errors
// export {}; // --> ensures the file is treated as a module.

// // Extend the Date prototype
// declare global {
//     interface Date {
//         toGermanLocaleString(): string;
//     }
// }

// // Add a new method to the Date prototype
// Date.prototype.toGermanLocaleString = function (): string {
//     const day = String(this.getDate()).padStart(2, '0');
//     const month = String(this.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = this.getFullYear();
//     return `${day}:${month}:${year}`;
// };

export const format = (
    date: Date, 
    hasYear = false,
    hasMonth = false,
    hasDay = false,
): string => {
    // Ensure date is a Date object
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    let formattedDate = "";
    switch (true) {
        case hasDay:
            formattedDate += `${day}.`;
            break;
        case hasMonth:
            formattedDate += `${month}.`;
            break;
        case hasYear:
            formattedDate += `${year}`;
            break;
        default:
            formattedDate += `${day}.${month}.${year}`;
    }
    return formattedDate;
}