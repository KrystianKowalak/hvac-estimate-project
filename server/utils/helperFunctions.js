const formattedDate = (date) => {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
}

const addOneMonth = (date) => {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + 1);
    return dateCopy;
};

function wrapDescription(description, length) {
    let result = "";
    let start = 0;

    while (start < description.length) {
        let end = start + length;

        if (end >= description.length) {
            result += description.slice(start);
            break;
        }

        let breakAt = description.lastIndexOf(" ", end);

        if (breakAt <= start) {
            result += description.slice(start, end) + "-\n-";
            start = end;
            continue;
        }

        result += description.slice(start, breakAt) + "\n";
        start = breakAt + 1;
    }

    return result;
}

module.exports = { formattedDate, addOneMonth, wrapDescription };