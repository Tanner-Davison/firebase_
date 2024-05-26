export const getProgress = section => {
  console.log(section);
  
    const sectionRect = section.getBoundingClientRect()
    let overlap = Math.max(
      0,
      Math.min(sectionRect.bottom, window.innerHeight) - sectionRect.top
    )
    return (overlap / sectionRect.height) * 100
  }