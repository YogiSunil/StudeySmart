"""Add status column to schedule

Revision ID: f37268a8704d
Revises: 21d886998e00
Create Date: 2025-01-16 17:35:58.269541

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f37268a8704d'
down_revision = '21d886998e00'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('schedule', schema=None) as batch_op:
        batch_op.drop_column('completed')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('schedule', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.BOOLEAN(), nullable=True))

    # ### end Alembic commands ###
