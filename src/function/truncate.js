export function truncate(input) {
    if (input.length > 17) {
        return input.substring(0, 17) + '...';
    }
    return input;
}
;