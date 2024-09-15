export default function MainLogo() {
    return(
      <div class="logo">
        <img src={`${process.env.PUBLIC_URL}/image.png`} alt="Logo" />
      </div>
    )
  }