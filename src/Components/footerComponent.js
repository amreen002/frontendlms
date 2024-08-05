import React from 'react';


function Footer() {
    return (

        <footer class="content-footer footer bg-footer-theme">
            <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div class="mb-2 mb-md-0">
                    ©
                    <script>
                        document.write(new Date().getFullYear());
                    </script>
                    <a href="#" target="_blank" class="footer-link fw-bolder">2024 Technogaze LMS</a>
                </div>
                <div>
                    <a href="https://technogaze.com/" class="footer-link me-4" target="_blank">Technogaze Solutions Pvt.Ltd</a>
                 

                 

                  
                </div>
            </div>
        </footer>

    )
}

export default Footer