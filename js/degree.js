export const degree = (direccion) => {
	const grados = {
		N: 0,
		NNE: 22.5,
		NE: 45,
		ENE: 67.5,
		E: 90,
		ESE: 112.5,
		SE: 135,
		SSE: 157.5,
		S: 180,
		SSO: 202.5,
		SO: 225,
		OSO: 247.5,
		O: 270,
		ONO: 292.5,
		NO: 315,
		NNO: 337.5,
	};	
	return grados[direccion] !== undefined ? grados[direccion] : null;
};
