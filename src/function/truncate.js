export function truncate(input) {
    if (input.length > 60) {
        return input.substring(0, 60) + '...';
    }
    return input;
}
;