export const getRatingColor = (rating) => {
    const value = Number(rating);
    
    if (value >= 90) return '#2365C7';
    if (value >= 75) return '#27ae60'; 
    if (value >= 60) return '#8e44ad'; 
    if (value >= 30) return '#f1c40f'; 
    if (value >= 1) return  '#e74c3c';
    return '#c6c6c6ff';                
};