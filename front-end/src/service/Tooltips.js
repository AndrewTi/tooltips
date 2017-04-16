angular.module("Tooltip", [])
    .factory("TooltipPos", () => {
        const setCoord = (toolt,elem) => {
            let bottom = elem.getBoundingClientRect().bottom;
            let left = elem.getBoundingClientRect().left;
            let width = tooltip.getBoundingClientRect().right - tooltip.getBoundingClientRect().left;

            toolt.style.top = bottom+"px";
            toolt.style.left = left+ "px";
            toolt.style.display = "block";
        };

        const resetCoord = (toolt) => {
            toolt.style.display = "none";
        };

        const setData = (toolt, data) => {
            toolt.head.textContent = data.head;
            toolt.text.textContent = data.text;
        };


        return {
            setData    : setData,
            setCoord   : setCoord,
            resetCoord : resetCoord
        }
    });