import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IronFitService } from '../ironfit.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  gymLocation: any = null;  // For now reused as laptop data
  loading = true;
  showToast = false;
  toastMessage = '';

  // Show Modal
  showForm = false;

  // Simple Laptop Order Form
  formData = {
    fullName: '',
    contact: '',
    address: '',
    paymentMethod: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ironfitService: IronFitService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const locationId = Number(this.route.snapshot.paramMap.get('id'));

    // load "laptop" data (currently named gymLocation)
    this.ironfitService.getGymById(locationId)
      .then(location => {
        this.gymLocation = location;
      })
      .catch(error => {
        console.error('Error loading item details:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  async submitForm(): Promise<void> {
    if (!this.formData.fullName || !this.formData.contact || !this.formData.paymentMethod) {
      alert('⚠ Please complete all required fields.');
      return;
    }

    // Order structure
    const orderData = {
      ...this.formData,
      laptopId: this.gymLocation.id,
      laptopName: this.gymLocation.name,
      placedAt: new Date().toISOString(),
    };

    try {
      // Reusing service function (rename later)
      const response = await this.ironfitService.addMembership(orderData);
      console.log('Order saved:', response);

      this.ngZone.run(() => {
        this.toastMessage = `🛒 Order placed for ${this.gymLocation.name}!`;
        this.showToast = true;
        this.showForm = false;

        setTimeout(() => this.showToast = false, 3000);
      });

      // Reset form
      this.formData = {
        fullName: '',
        contact: '',
        address: '',
        paymentMethod: '',
      };

    } catch (error) {
      console.error('Error submitting order:', error);

      this.toastMessage = '❌ Failed to place order. Please try again.';
      this.showToast = true;

      setTimeout(() => this.showToast = false, 3000);
    }
  }
}
