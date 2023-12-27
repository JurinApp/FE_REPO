export const lockBodyScroll = () => {
	document.body.style.overflow = "hidden";
};

export const cancelLockBodyScroll = () => {
	document.body.style.overflow = "auto";
};
